import { FormDialog } from "@/components/form-dialog";
import { Header } from "@/components/header";
import { Content } from "@/components/property/properties-card";
import { PropertyCardImage } from "@/components/property/property-card-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UnitDetailsCard } from "@/components/unit/unit-details-card";
import { UnitForm } from "@/components/unit/unit-form";
import {
  getPropertyIdsAndNames,
  getUnitDetails,
} from "@/lib/actions/unit-actions";
import { format } from "date-fns";
import { MdOutlineAssignmentInd } from "react-icons/md";

const UnitDetailsPage = async ({ params }: { params: { id: string } }) => {
  const unit = await getUnitDetails(params.id);
  const fetchedProperties = await getPropertyIdsAndNames();

  if (!unit) return <div>404 Not Found</div>;

  return (
    <>
      <Header
        headerLabel="Unit Details"
        formComponent="unit"
        properties={fetchedProperties || []}
      />
      <div className="grid lg:grid-cols-2 mt-5 gap-5">
        <UnitDetailsCard unit={unit} />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Tenant Details</CardTitle>
              <Button size="zero" variant="dialog">
                <MdOutlineAssignmentInd />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {unit.tenant ? (
              <>
                <Content label="First Name: " value={unit.tenant.firstName} />
                <Content label="Last Name: " value={unit.tenant.lastName} />
                <Content label="Email Address: " value={unit.tenant.email} />
                <Content
                  label="Phone Number: "
                  value={unit.tenant.phoneNumber}
                />
                <Content
                  label="Lease Start: "
                  value={format(new Date(unit.tenant.leaseStart), "PPP")}
                />
                <Content
                  label="Lease End: "
                  value={format(new Date(unit.tenant.leaseEnd), "PPP")}
                />
                <Content
                  label="Lease Term: "
                  value={`${unit.tenant.termInMonths} months`}
                />
              </>
            ) : (
              <div>Unit is currently vacant</div>
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default UnitDetailsPage;

/*
1. Unit Information
Unit Number (number): Display the unit number (e.g., "Unit 101").
Rent Amount (rentAmount): Show the monthly rent amount for the unit.
Due Date (dueDate): If available, display the rent due date (e.g., "Rent due on the 1st of every month").
Created At (createdAt): When the unit was created.
Updated At (updatedAt): The last time the unit information was updated.
2. Tenant Information
Tenant Name (firstName, lastName): Display the current tenant's full name if there is one.
Email (email): Show the tenant's email address.
Phone Number (phoneNumber): Display the tenant's contact number.
Lease Start Date (leaseStart): When the lease started.
Lease End Date (leaseEnd): When the lease is set to end.
Lease Term (termInMonths): The term length of the lease in months.
Tenant Profile Image (image): If the tenant has uploaded an image, display it.
3. Property Information
Property Name (property.name): Show the name of the property to which this unit belongs.
Address (property.address): Display the property address.
4. Financial Details
Rent Due Status: Calculate the rent due status based on the due date and the tenant’s payment history (if tracking payments).
Outstanding Rent: If applicable, show the outstanding rent amount if the tenant has unpaid rent.
5. Lease Details
Days Left on Lease: Show the number of days left until the lease ends.
Lease Renewal Status: Indicate if the lease is up for renewal or expiring soon.
6. Actions and Management
Edit Unit Details: A button or link to edit unit information (e.g., rent amount, due date).
Edit Tenant Information: A button or link to edit tenant details.
Manage Lease: Options to manage the lease, such as renewal, termination, or updating terms.
Upload/Change Tenant Image: A button to upload or change the tenant's profile image.
7. Unit History
Previous Tenants: If applicable, a list of previous tenants with their lease dates.
Maintenance Requests: List of past or ongoing maintenance requests related to this unit.
8. Other
Notes: A section for admin or property managers to add any internal notes about the unit (e.g., special conditions, observations).
Documents: Provide the ability to upload or view lease documents or tenant agreements associated with the unit.
*/
