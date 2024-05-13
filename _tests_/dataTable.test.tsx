import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DataTable from '@/components/DataTable/DataTable';
import { AppRoutes } from '@/types/types';
import '@testing-library/jest-dom';

import { useUpdateUser } from '@/queries/users';

jest.mock('@/queries/users', () => ({
  useUpdateUser: jest.fn()
}));

beforeEach(() => {
  const mutateAsync = jest.fn().mockResolvedValue({});
  //@ts-ignore
  useUpdateUser.mockReturnValue({ mutateAsync });
});

jest.mock('axios');

jest.mock('next/router', () => ({
  push: jest.fn(),
  back: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  push: jest.fn(),
  back: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


jest.mock('@/queries/users', () => ({
  useAddUser: jest.fn(() => ({ mutateAsync: jest.fn() })),
  useUpdateUser: jest.fn(() => ({ mutateAsync: jest.fn() })),
  useUser: jest.fn(() => ({ data: { name: "", userName: "", email: "", city: "" } }))
}));


const mockedColumns = [
  {
    field: "test",
    label: "test",
    width: 50
  }
]

const mockedData = [
  {
    name: "",
    userName: "",
    email: "",
    city: "",
    id: '2'
  }
]

describe('DataTable components', () => {
  it('Test column renders correctly', async () => {
    render(
      <DataTable
        columns={mockedColumns} data={mockedData} />
    );

    await waitFor(() => expect(screen.getByText('test')).toBeInTheDocument());
  });

  it("Edit button works correctly", async () => {

    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })

    //@ts-ignore
    const router = useRouter();

    const { getByText } = render(
      <DataTable
        columns={mockedColumns} data={mockedData}
        actionColumns={[
          {
            label: "Edit",
            onClick: (id: string) => {

              router.push(`${AppRoutes.edit}/${id}`);
            },
          }
        ]}
      />
    );
    fireEvent.click(getByText("Edit"));

    //@ts-ignore
    expect(useRouter().push).toHaveBeenCalledWith("/edit/2")

  })
});




