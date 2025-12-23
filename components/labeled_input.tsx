import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LabeledInput(
  {label, id, ...props} : {label: string} & InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props}/>
    </div>
  )
}

export {LabeledInput}
