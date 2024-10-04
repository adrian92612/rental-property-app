type ModelNotFoundProps = {
  model: "Property" | "Unit" | "Tenant";
};

export default function ModelNotFound({ model }: ModelNotFoundProps) {
  const notFoundMessages = [
    `We couldn't locate the ${model} you're looking for. Please check the ID and try again.`,
    `The ${model} you're searching for does not exist. It may have been removed or never added.`,
    `No ${model} found with this ID. Please verify the information and try again.`,
    `Sorry, we couldn't find the requested ${model}. Please double-check your request.`,
    `This ${model} is not available in our records. It may have been removed or entered incorrectly.`,
    `The ${model} you're looking for is not found in our system. Double-check the ID or contact support.`,
    `Oops! We couldn't find the ${model} associated with this ID. Ensure the details are correct.`,
    `It seems the ${model} you're trying to access no longer exists. Please try another ID.`,
    `Unfortunately, we couldn't find this ${model}. It might have been relocated or deleted.`,
    `The ${model} you're trying to view does not exist in our database. Please verify the ID.`,
  ];
  const randomIndex = Math.floor(Math.random() * notFoundMessages.length);

  return (
    <section className="grid place-items-center h-full text-center">
      <div>
        <h2 className="font-bold text-2xl mb-5">404 | {model} Not Found</h2>
        <p>{notFoundMessages[randomIndex]}</p>
      </div>
    </section>
  );
}
