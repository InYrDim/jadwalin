"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Calendar as CalendarIcon } from "lucide-react";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

export function DatePicker({
  getDate,
}: {
  getDate: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>();

  React.useEffect(() => {
    getDate(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          className={cn(
            "w-[280px] justify-start text-left font-base",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-text" />
          {date ? (
            format(date, "eeee, dd MMMM yyyy", { locale: id })
          ) : (
            <span className="text-text">Pilih Tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto !border-0 p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />

        <Button
          className="w-full"
          variant={"neutral"}
          onClick={() => {
            setDate(new Date());
          }}
        >
          Today
        </Button>
      </PopoverContent>
    </Popover>
  );
}
