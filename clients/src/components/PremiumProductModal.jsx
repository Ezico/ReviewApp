import React from "react";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import PremiumErrorIcon from "./PremiumErrorIcon";

const PremiumProductModal = ({ user, open, onClose, product }) => {
  const buyProduct = async (e) => {
    const priceToCharge = product.reviewPrice;
    const whereToCharge = user.balance;
    const myProducts = user?.itemsPurchased;
    const updatedUserBalance = user.balance - product.reviewPrice;
    myProducts.push(product.url);
    if (whereToCharge < priceToCharge) {
      toast.info("Insuficent balance");
      onClose();
      return;
    } else {
      try {
        await addDoc(collection(db, "Orders"), {
          ordeId: product.url,
          userId: user.id,
          amount: priceToCharge,
          date: serverTimestamp(),
        });
        await updateDoc(doc(db, "Users", user.id), {
          balance: updatedUserBalance,
          itemsPurchased: myProducts,
        });
        toast.success("Podcast Created Successfully");
      } catch (err) {
        toast.error("Not Added" + err);
      }
    }
    window.location.reload();
  };
  if (!open) return null;
  return (
    <div className="modal" tabIndex={-1} id="kt_modal_1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <button onClick={onClose} className="close-modal">
              X
            </button>
            <div className="centered">
              <PremiumErrorIcon />
            </div>
            <div style={{ textAlign: "center" }}>
              This is a Premium product you need to purchase this product in
              order to review.
            </div>

            <br />
            <button onClick={buyProduct} className="buy_btn">
              Buy Now
            </button>
            <br />
            <center>
              <a href={`/buy/${product?.url}`} className="hiw centered">
                Fund Account
              </a>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumProductModal;
