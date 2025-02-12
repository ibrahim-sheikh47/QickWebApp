/* eslint-disable react/prop-types */
import { Button } from "antd";
import assets from "../../assets/assets";
const AddTeamSection = ({ handleToggleModal, customStyle }) => {
  return (
    <div
      className={`h-[106px] border-secondaryThirty border shadow-custom w-[430px] rounded-lg flex flex-col justify-center mt-5 ${customStyle}`}
    >
      <div
        className="flex items-center gap-2 px-3 cursor-pointer"
        onClick={() => handleToggleModal("team1", true)}
      >
        <Button
          size="small"
          icon={<img src={assets.plus} className="w-3 h-3" />}
          className="rounded-full border-none bg-lime"
          type="none"
        />
        <p className="text-sm text-primary font-PJSbold">Add Team 1</p>
      </div>
      <div className="border-t border-secondaryThirty w-[80%] my-3"></div>
      <div
        className="flex items-center gap-2 px-3 cursor-pointer"
        onClick={() => handleToggleModal("team2", true)}
      >
        <Button
          size="small"
          icon={<img src={assets.plus} className="w-3 h-3" />}
          className="rounded-full border-none bg-lime"
          type="none"
        />
        <p className="text-sm text-primary font-PJSbold">Add Team 2</p>
      </div>
    </div>
  );
};

export default AddTeamSection;
