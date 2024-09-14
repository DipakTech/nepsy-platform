import IPOResultModal from "@/components/component/Ipo-result-modal";
import { IpoResultTable } from "@/components/component/result-table";

export default async function Page() {
  return (
    <div className="flex flex-col gap-3 container mx-auto">
      <IPOResultModal />
      <IpoResultTable />
    </div>
  );
}
