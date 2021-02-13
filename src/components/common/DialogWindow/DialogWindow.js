import { useEffect } from 'react'
import './DialogWindow.scss'
import Button from "components/common/Button/Button";

function DialogWindow ({accept, reject}) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    })

    return <div className="dialog-container">
        <div className="dialog-container__close" onClick={reject}></div>
        <div className="dialog">
            <div className="dialog__close">
                <Button onClick={reject} className="remove-btn"/>
            </div>
            <div className="dialog__text">
                Sure?
            </div>
            <div className="dialog__buttons">
                <Button onClick={accept} className="button" value="Yes"/>
                <Button onClick={reject} className="button button--red" value="No"/>
            </div>
        </div>
    </div>
}

export default DialogWindow;