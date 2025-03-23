import React from "react";

interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    newTitle: string;
    setNewTitle: (title: string) => void;
    newContent: string;
    setNewContent: (content: string) => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSave,
    newTitle,
    setNewTitle,
    newContent,
    setNewContent,
}) => {
    if (!isOpen) return null;

    return(
        <div className="modal">
            <div className="modal-content"> 
                <h2>Nova Mensagem</h2>
                <input 
                    type="text" 
                    placeholder="Título"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                    placeholder="Conteúdo"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                />
                <div className="modal-button">
                    <button className="add-btn" onClick={onSave}> Adicionar </button>
                    <button className="cancel-btn" onClick={onClose}> Cancelar </button>
                    
                </div>
            </div>
        </div>
    );
};

export default Modal;