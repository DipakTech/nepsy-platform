import { getCompanies } from "@/action/ipo-result";
import { getCurrentUserSharesList } from "@/action/share/getCurrentUserSharesList";
import IPOResultModal from "@/components/component/Ipo-result-modal";
import { IpoResultTable } from "@/components/component/result-table";
import { Share } from "@prisma/client";

export default async function Page() {
  const appliedShareList: Share[] = await getCurrentUserSharesList();
  const companies = await getCompanies();
  return (
    <div className="flex flex-col gap-3 mt-24 container mx-auto">
      <div className="h-[150px] flex justify-center items-center">
        <IPOResultModal
          appliedShareList={appliedShareList}
          companies={companies}
        />
      </div>
      <IpoResultTable
        appliedShareList={appliedShareList}
        companies={companies}
      />
    </div>
  );
}
