import {Pen, Trash, Check, X, PlusCircle} from "lucide-react"
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";

type Message = {
    id:number;
    title: string;
    content: string;
}

const Messages:  React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [editingContent, setEditingContent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() =>{
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        const formattedMessages = response.data.slice(0,5).map((msg: any) => ({
          id:msg.id,
          title: msg.title,
          content: msg.body,
        }));
        setMessages(formattedMessages);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao procurar as publicações:", error);
        setError("Erro ao carregar as publicações.");
        setLoading(false);
      });
  }, []);

  if(loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  const handleEdit = (id: number, title: string, content: string) => {
    setEditingId(id);
    setEditingTitle(title);
    setEditingContent(content);
  };

  const handleSave = async (id: number) => {
    setMessages((prevMessages) => 
      prevMessages.map((msg) =>
        msg.id == id ? {...msg, title: editingTitle, content: editingContent}: msg
      )
    );
    setEditingId(null)

    await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        title: editingTitle,
        body: editingContent,
      }
    ).catch(error => {
      console.error("Erro ao salvar a publicação na API:", error);
    })

  };

  const handleCancel = () => {
    setEditingId(null);
  }

  const handleDelete = async (id: number) => {
    setMessages((prevMessages) => 
      prevMessages.filter((msg) => msg.id != id )
    );

    await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    ).catch(error => {
      console.error("Erro ao deletar a publicação na API:", error);
    })
  };

  const handleAddMessage = async () => {
    if(!newTitle.trim() || !newContent.trim()) return;

    const newMessage = {
      id: messages.length +1,
      title: newTitle,
      content: newContent,
    };

    setMessages([...messages, newMessage]);
    setIsModalOpen(false);
    setNewTitle("");
    setNewContent("");

    try{
      await axios.post("https://jsonplaceholder.typicode.com/posts/ ",{
        title: newTitle,
        body: newContent,
      });
    } catch(error){
      console.error("Error ao adicionar a publicação na API", error);
    }
  }


    return(
        <div className="container">
          <Modal
              isOpen = {isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleAddMessage}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              newContent = {newContent}
              setNewContent={setNewContent}
          
          />
          <button className="add-button" onClick={() => setIsModalOpen(true)}> <PlusCircle  size={32}/></button>
        <h1 className="title-h1">Mensagens</h1>
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">Número</th>
              <th className="table-cell">Título</th>
              <th className="table-cell">Conteúdo</th>
              <th className="table-cell">Ações</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg.id} className="table-row">
                <td className="table-cell">{index+ 1}</td>
                <td className="table-cell">
                  {editingId == msg.id ? (
                    <input 
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle (e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    msg.title
                  )}
                  
                </td>

                <td className="table-cell">
                  {editingId == msg.id ? (
                    <input 
                      type="text" 
                      value={editingContent}
                      onChange={(e => setEditingContent(e.target.value))}
                      className="edit-input"
                    />

                  ) : (
                    msg.content
                  )}
                </td>

                <td className="table-cell">
                  {editingId === msg.id ? (
                    <>
                      <button className="action-button save-button" onClick={() => handleSave(msg.id)}>
                        <Check size={16} stroke="green"/>
                      </button>
                      <button className="action-button cancel-button" onClick={handleCancel}>
                        <X size={16} stroke="red"/>
                      </button>

                    </>
                  ) : (
                    <>
                      <button className="action-button edit-button" onClick={() => handleEdit(msg.id, msg.title, msg.content)}>
                        <Pen size={16} />
                      </button>
                      <button className="action-button remove-button" onClick={()=> handleDelete(msg.id)}>
                        <Trash size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
};

export default Messages;