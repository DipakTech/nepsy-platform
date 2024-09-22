import { getCompanies } from "@/action/ipo-result";
import { getCurrentUserSharesList } from "@/action/share/getCurrentUserSharesList";
import { getAccountHoldersWithShares } from "@/action/share/getShareResults";
import { ResultTab } from "@/components/component/result/result-tab";

export default async function Page() {
  const appliedShareList = await getCurrentUserSharesList();
  const companies = await getCompanies();
  const accountHoldersWithShares = await getAccountHoldersWithShares();

  return (
    <div className="flex max-w-6xl p-2 sm:p-5 rounded-md shadow-md flex-col gap-3 mt-24  mx-auto dark:bg-[#0D1421]">
      <ResultTab
        appliedShareList={appliedShareList}
        companies={companies}
        accountHoldersWithShares={accountHoldersWithShares}
      />
    </div>
  );
}
