import { getProperty } from "@/lib/actions/property-actions";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);

  if (!property) return <div>404 Not Found</div>;

  return <div>Property Details Page</div>;
};

export default PropertyDetailsPage;
