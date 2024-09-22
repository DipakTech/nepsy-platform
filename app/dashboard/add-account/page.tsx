import { AccountHolders } from "@/components/component/account-holder/account-holder";

export default function Page() {
  return (
    <div className="flex max-w-6xl p-1 sm:p-5 rounded-md shadow-md flex-col gap-3 mt-24  mx-auto dark:bg-[#0D1421]">
      <AccountHolders />
    </div>
  );
}
