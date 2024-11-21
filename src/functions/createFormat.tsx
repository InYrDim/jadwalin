import { format } from "date-fns";
import { id } from "date-fns/locale";

function formatString(template: string, values: any) {
  return template.replace(/#@(\w+)/g, (match, key) => {
    return values[key] !== undefined ? values[key] : ""; // Return value or empty string
  });
}

export default function createFormat(
  arg: {
    date: any;
    [key: string]: any;
  },
  stringFormat: string
): string {
  arg["date"] = format(arg.date, "eeee, dd MMMM yyyy", { locale: id });

  console.log(arg["date"]);
  // Define your template
  const template = `
|| Jadwal perkuliahan Minggu Ke 13. #@date ||
‼ #@matkul ‼
- Pukul -
Jumlah SKS : 3
Pelaksanaan : -
Dosen : #@dosen

> 📌NB : No Info

“msh bisa berubah tergantung siskon dan dosen👌`;

  // Define your values
  const formattedString = formatString(stringFormat, arg);

  return formattedString;
}
