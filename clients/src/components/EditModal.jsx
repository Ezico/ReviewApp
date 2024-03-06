import apple from "../assets/images/apple_small.png";
import google from "../assets/images/google_small.png";
import pod from "../assets/images/podbean_small.png";
import spotify_small from "../assets/images/sportify_small.png";
import amazon from "../assets/images/amazon_small.png";
import youtube from "../assets/images/youtube_small.png";

const EditModal = ({ open, onClose, id }) => {
  console.log(id);
  if (!open) return null;
  return (
    <div className="modal" tabIndex={-1} id="kt_modal_1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <button onClick={onClose} className="close-modal">
              X
            </button>

            <div className="row pop">
              <div className="col-sm-6">
                <input type="text" />
              </div>
              <div className="col-sm-6">
                <input type="text" />
              </div>
              <div className="col-sm-6">
                {" "}
                <input type="text" />
              </div>
              <div className="col-sm-6">
                {" "}
                <input type="text" />
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
