import { useDispatch } from "react-redux";
import { useModal } from "../../context/MasterModal";
import { deleteChannel } from "../../store/channel";
import "./Messages.css";

const DeleteChannel = ({ channelId, user }) => {
  const dispatch = useDispatch();
  const { setMsgCount, setCurrUser } = useModal();

  const del = () => {
    dispatch(deleteChannel(channelId, user.id));
    setMsgCount(0);
    setCurrUser(null);
  };

  return (
    <div className="del-channel-main">
      <div className="del-chan-top">
        <div className="del-chan-title">Delete Chat?</div>
      </div>
      <div className="del-chan-yes" onClick={del}>
        Delete
      </div>
      <div className="unfollow-cancel" onClick={() => setMsgCount(0)}>
        Cancel
      </div>
    </div>
  );
};

export default DeleteChannel;  