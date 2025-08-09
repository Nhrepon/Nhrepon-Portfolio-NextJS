
// export default function BreadCrumb() {
//     const currentPath = usePathname();
//   return (
//     <div>
//         {"Home" + " > " + currentPath.split("/").slice(1).join(" > ")}
//     </div>
//   )
// }


// components/BreadCrumb.jsx — No hooks, server‑safe
export default function BreadCrumb({ segments = [] }: { segments: string[] }) {
    const pathString = segments
    .map((seg: any) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join(" > ");

    return <div>{pathString}</div>;
}

