import { Song } from '@/types'
import { useUser } from './useUser'
import useAuthModal from './useAuthModal'
import useSubscribeModal from './useSubscribeModal'
import usePlayer from './usePlayer'


const useOnPlay = (songs: Song[]) => {
    const player = usePlayer()
    //const subscribeModal = useSubscribeModal()
    const authModal = useAuthModal()
    const { subscription, user } = useUser()

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen()
        }

       
        player.setId(id);
        player.setIds(songs.map((song) => song.id))
    }

    return onPlay
}

export default useOnPlay