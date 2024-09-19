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
    <div className="flex flex-col gap-3 mt-24 container mx-auto">
      <AccountHolders accountHolders={accountHolders} />
    </div>
  );
}
