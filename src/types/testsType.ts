import { Tests } from "@prisma/client";

export type ITestsData = Omit<Tests, 'id' >;