import { Header } from "@/components/header";
import { PersonalInformation } from "@/components/tenant/personal-information-card";
import { getTenantData } from "@/lib/actions/tenant-actions";

const TenantDetailsPage = async ({ params }: { params: { id: string } }) => {
  const tenant = await getTenantData(params.id);

  if (!tenant) return <div>No Tenant Found</div>;

  return (
    <>
      <Header headerLabel="Tenant Details" formComponent="tenant" />
      <div className="grid lg:grid-cols-2">
        <PersonalInformation tenant={tenant} />
      </div>
    </>
  );
};

export default TenantDetailsPage;

/*
1. Personal Information (Card 1)
This card can focus on the basic personal details of the tenant.

Full Name: First and last name.
Email: Tenant's email address.
Phone Number: Contact information.
Profile Image: If available, display their image.
2. Lease Information (Card 2)
Information about the tenant’s lease.

Lease Start Date: When the lease started.
Lease End Date: When the lease will expire.
Lease Term: Duration of the lease (in months).
Days Left on Lease: Calculate the number of days left until the lease ends.
3. Unit Information (Card 3)
This card can provide information about the unit the tenant is occupying.

Unit Number: Display the number of the unit.
Rent Amount: Monthly rent.
Due Date: Rent due date (if applicable).
Property: Name of the property.
4. Financial Information (Card 4)
This card can show financial details and payment status.

Outstanding Rent: Show any unpaid rent, if applicable.
Payment History: Optionally list recent rent payments made by the tenant.
Total Rent Paid: Sum of the rent paid during the current lease period.
Bonus Sections:
Maintenance Requests: List of any open or past maintenance requests from the tenant (could be in its own card).
Documents: Any lease agreements or legal documents related to the tenant.
Notes: A place to store internal notes about the tenant (e.g., payment history, behavior, etc.).
These categories help break up the information into easy-to-understand sections while providing a complete overview of the tenant's details.
*/
