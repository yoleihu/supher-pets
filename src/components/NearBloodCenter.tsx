import { DotsThree, FirstAid } from "phosphor-react"
import { useState } from "react"
import { BloodCenterOutput } from "../interfaces/User";
import { BloodCenterInfoModal } from "./Modals/BloodCenterInfoModal";

interface NearBloodCenterProps {
  bloodCenter: BloodCenterOutput,
}

export const NearBloodCenter = ({ bloodCenter }: NearBloodCenterProps) => {
  const [bloodCenterInfoModalOpen, setBloodCenterInfoModalOpen] = useState(false);

  return (
    <>
      {bloodCenterInfoModalOpen &&
        <BloodCenterInfoModal bloodCenter={bloodCenter} isOpen={bloodCenterInfoModalOpen} onClose={() => setBloodCenterInfoModalOpen(false)} />
      }

      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-2">
          <FirstAid color="red" />
          <p>{bloodCenter.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>{bloodCenter.telephone}</p>
          <button onClick={() => setBloodCenterInfoModalOpen(true)}>
            <DotsThree color="#075985" />
          </button>
        </div>
      </div>
    </>
  )
}
