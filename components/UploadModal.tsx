"use client";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

const UploadModal = () => {
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      // React hook form
      reset();
      //
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // Upload to Supabase
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing Fileds");
        return;
      }

      const uniqeID = uniqid();

      //upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqeID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }
      ////////////////

      //upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqeID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }
      ////////////////
      //Record
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onClose();
      ////////////////
      
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an .mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          placeholder="Song Title"
          title="title"
          disabled={isLoading}
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          placeholder="Song Author"
          title="title"
          disabled={isLoading}
          {...register("author", { required: true })}
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
