import { memo } from "react";
import { DateRangePicker } from "rsuite";

const MemDtPkr = memo(({ ...props }) => {
  return (
    <DateRangePicker size="xs" format="yyyy-MM-dd" character="~" {...props} />
  );
});

export default MemDtPkr;
