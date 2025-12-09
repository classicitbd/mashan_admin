import { RxCross1 } from "react-icons/rx";

const ShowOfferDescription = ({ setShowDesCription, desCriptionData }) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[1200px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin ">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="sm:text-[26px] font-bold text-primaryColor uppercase"
              id="modal-title "
            >
              Create Offer
            </h3>
            <button
              type="button"
              className="btn text-crossBtnHoverColor  p-1 absolute right-3 rounded-full top-3 hover:bg-crossBtnHoverColor hover:text-crossBtnHovertextColor cursor-pointer transition-all duration-300"
              onClick={() => setShowDesCription(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />
          <div className="mt-4">
            <div dangerouslySetInnerHTML={{ __html: desCriptionData }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOfferDescription;
