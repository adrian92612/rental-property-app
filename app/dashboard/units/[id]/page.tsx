import { getUnitDetails } from "@/lib/actions/unit-actions";

const UnitDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getUnitDetails(params.id);

  if (!property) return <div>404 Not Found</div>;

  return <div>Property Details Page</div>;
};

export default UnitDetailsPage;
