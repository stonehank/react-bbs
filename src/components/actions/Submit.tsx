import React from 'react';
import Button from "../UI/Button";

type Props={
    submit:()=>void,
    submitLoading:boolean
}

function Submit({submit,submitLoading}:Props) {
    console.log('render submit')
    return (
        <div className="text-right mt-2">
            <Button onClick={submit} loading={submitLoading}>提交</Button>
        </div>
    );
}

export default React.memo(Submit,(prev,next)=>prev.submitLoading===next.submitLoading);
