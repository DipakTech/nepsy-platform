// import { getCompanies } from "@/action/ipo-result";
import { getAccountHolders } from "@/action/accountHolder/get-account-holders";
import { AccountHolders } from "@/components/component/account-holder/account-holder";
// import { getCurrentUserSharesList } from "@/action/share/getCurrentUserSharesList";
// import { Share } from "@prisma/client";

export default async function Page() {
  // const appliedShareList: Share[] = await getCurrentUserSharesList();
  const accountHolders = await getAccountHolders();
  // const companies = await getCompanies();
  return (
    <div className="flex max-w-6xl p-5 rounded-md shadow-md flex-col gap-3 mt-24  mx-auto dark:bg-[#0D1421]">
      <AccountHolders accountHolders={accountHolders} />
    </div>
  );
}
