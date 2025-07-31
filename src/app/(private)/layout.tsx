export default async function PrivateLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className="private-layout">{children}</div>;
}
