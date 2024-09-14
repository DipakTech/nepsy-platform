import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getCompanies } from "@/action/ipo-result";

export const IPOResultModal = async () => {
  const companies = await getCompanies();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit ">
          Check IPO Result
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-white max-w-xl border-none">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            MER<span className="text-red-600">SHARE</span>
          </h1>
          <p className="text-lg">Check Share Result</p>
        </div>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="company">Select company</Label>
            <Select>
              <SelectTrigger id="company" className="bg-[#2d2d44] text-white">
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company: { id: string; name: string }) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="boid">16-digit BOID</Label>
            <Input
              id="boid"
              placeholder="16-digit BOID"
              className="bg-[#2d2d44] text-white"
            />
          </div>
          {/* <Button className="w-full bg-[#4a4a6a] text-white">
              View Result
            </Button> */}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          © 2024. All Rights Reserved
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default IPOResultModal;
