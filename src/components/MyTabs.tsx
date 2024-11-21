import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCopyToClipboard } from "usehooks-ts";
import { useState, useRef, useEffect } from "react";
import { DatePicker } from "./ui/date-picker";

import createFormat from "@/functions/createFormat";

export function MyTabs() {
  const [copiedText, copy] = useCopyToClipboard();
  const [text, setText] = useState("Dummy");
  const [alertCopy, setAlertCopy] = useState(false);

  const [tab, setTab] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined);

  const [format, setFormat] = useState<string>("");

  const inputDosen = useRef<HTMLInputElement>(null);
  const inputMatkul = useRef<HTMLInputElement>(null);

  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  function handleSetFormat() {
    const format = textAreaElement.current?.value ?? "";
    setFormat(format);
  }
  function handleSetDate(data: Date | undefined) {
    setDate(data);
  }
  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setAlertCopy(true);
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  useEffect(() => {
    if (textAreaElement.current) {
      textAreaElement.current.value = format;
    }
  }, [tab]);

  return (
    <>
      <AlertDialog open={alertCopy}>
        <AlertDialogContent className="bg-circle">
          <AlertDialogHeader>
            <AlertDialogTitle>Tersimpan!</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="block border-2 border-black border-dashed bg-neutral-50 p-2">
                Jadwal kamu sudah tersimpan di clipboard. Silahkan bagikan ke
                Whatsapp👌
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="w-full"
              onClick={() => {
                setAlertCopy(false);
              }}
            >
              Ok
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs
        defaultValue="set_format"
        onValueChange={() => {
          setTab(!tab);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="set_format">Atur Format</TabsTrigger>
          <TabsTrigger value="create_schedule">Buat Jadwal</TabsTrigger>
        </TabsList>
        <TabsContent value="set_format">
          <div>
            <Textarea ref={textAreaElement} className="min-h-52" />
            <AlertDialog>
              <AlertDialogContent className="bg-circle">
                <AlertDialogHeader>
                  <AlertDialogTitle>Tersimpan!</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className="block border-2 border-black border-dashed bg-neutral-50 p-2">
                      Format yang kamu buat sudah tersimpan, silahkan membuat
                      jadwal😁
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-full">Ok</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
              <AlertDialogTrigger asChild>
                <Button
                  className="block ms-auto mt-4"
                  variant={"reverse"}
                  onClick={handleSetFormat}
                >
                  Buat Format
                </Button>
              </AlertDialogTrigger>
            </AlertDialog>
          </div>
        </TabsContent>
        <TabsContent value="create_schedule">
          <div>
            <div className="space-y-4 mt-8">
              <Input
                ref={inputDosen}
                className="w-full"
                type="text"
                placeholder="Nama Dosen"
              />
              <Input
                className="w-full"
                ref={inputMatkul}
                type="text"
                placeholder="Mata Kuliah"
              />
              <DatePicker getDate={handleSetDate} />
            </div>

            <AlertDialog>
              <AlertDialogContent className="bg-circle">
                <AlertDialogHeader>
                  <div className="flex justify-between">
                    <AlertDialogTitle>Ini Formatnya</AlertDialogTitle>
                    <Button
                      variant={"reverse"}
                      onClick={handleCopy(text)}
                      className="bg-neutral-50"
                    >
                      <i className="ri-file-copy-line text-lg"></i>
                    </Button>
                  </div>
                  <AlertDialogDescription>
                    <span className="block border-2 border-black border-dashed bg-neutral-50 p-2">
                      {text}
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-full">Ok</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
              <AlertDialogTrigger asChild>
                <Button
                  className="block ms-auto mt-4"
                  variant={"reverse"}
                  onClick={() => {
                    setText(
                      createFormat(
                        {
                          dosen: inputDosen.current?.value,
                          matkul: inputMatkul.current?.value,
                          date: date,
                        },
                        format
                      )
                    );
                  }}
                >
                  Generate!
                </Button>
              </AlertDialogTrigger>
            </AlertDialog>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
