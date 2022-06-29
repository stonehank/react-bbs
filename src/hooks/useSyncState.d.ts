import { Dispatch, MutableRefObject, SetStateAction } from 'react';
declare function useSyncState<S>(initialState: S): [S, MutableRefObject<S>, Dispatch<SetStateAction<S>>];
export default useSyncState;
