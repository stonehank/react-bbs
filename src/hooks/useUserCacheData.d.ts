import { UserInfo } from '../types';
declare type UserCacheDataResult = UserInfo & {
    setAvatar: (avatar: string) => void;
    setEmail: (email: string) => void;
    setNickname: (nickname: string) => void;
};
declare function useUserCacheData(): UserCacheDataResult;
export default useUserCacheData;
