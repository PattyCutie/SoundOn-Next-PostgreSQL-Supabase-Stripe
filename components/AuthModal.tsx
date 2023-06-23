"use client";
import {useEffect} from 'react'
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();

  const {onClose, isOpen} = useAuthModal()

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }

  }, [onClose, router, session])

  return (
    <Modal
      title="Welcome Back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={["github", "google", "azure"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: "#040404", brandAccent: "#0ea5e9" } },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
