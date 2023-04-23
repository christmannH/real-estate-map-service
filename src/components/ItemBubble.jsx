import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { ItemBubbleContent } from "./ItemBubbleContent";
import { ModalStyle } from "./Common/Modal.Style";
import "./ItemBubble.scss";

Modal.setAppElement("body");

const checkFile = () => {
  try {
    return require("./ListingModal");
  } catch (err) {
    return null;
  }
};
const ListingModal = checkFile() ? checkFile().default : null;

const ItemBubble = ({ item, duplicatedItems }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isInfoClick, setIsInfoClick] = useState(false);
  const modalRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  const openInfo = () => {
    if (!isInfoClick) {
      setIsInfoOpen(true);
    }
  };
  const pointInfo = () => {
    setIsInfoClick(true);
    if (duplicatedItems.length === 1) {
      openModal(item)
    }
  };
  const openModal = (clickedItem) => {
    setSelectedItem(clickedItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("mouseover", handleOut);
    return () => window.removeEventListener("mouseover", handleOut);
  }, []);

  const handleOut = (e) => {
    if (modalRef?.current?.contains(e.target)) return;
    setIsInfoClick(false);
    setIsInfoOpen(false);
  };

  return (
    <>
      <div
        ref={modalRef}
        onClick={pointInfo}
        onMouseOver={openInfo}
        className={
          item.isSecondaryResult
            ? !isInfoOpen
              ? "marker_grey"
              : "marker_purple"
            : !isInfoOpen
            ? "marker_green"
            : "marker_purple"
        }
      >
        {duplicatedItems.length > 1
          ? duplicatedItems.length + " Listings"
          : numFormatter(item.displayPrice)}

        <div
          className="popOutDiv"
          style={{ display: isInfoClick || isInfoOpen ? "block" : "none" }}
        >
          <ItemBubbleContent
            openModal={openModal}
            duplicatedItems={duplicatedItems}
            isInfoOpen={isInfoOpen}
          />
        </div>
      </div>

      {ListingModal && (
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: ModalStyle.overlay,
            content: {
              ...ModalStyle.content,
              width: "1300px",
            },
          }}
        >
          <ListingModal itemId={selectedItem.id} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export { ItemBubble };
