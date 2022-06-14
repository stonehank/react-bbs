import {emailVerify,linkVerify} from '../utils/Verify';
export default function useValidate(ref){

    function validate(){
        return ref.current.validate()
    }
    function getElement(){
        return ref.current.getElement()
    }
    function reset(){
        return ref.current.reset()
    }

    return {
        validate,
        getElement,
        reset,
        emailVerify,
        linkVerify
    }
}
