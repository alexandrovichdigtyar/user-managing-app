import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import EditModal from '@/components/EditModal/EditModal';

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

describe('EditModal', () => {
    it('Submits the form data correctly when "Save" is clicked', async () => {
        const { mutateAsync } = require('@/queries/users').useUpdateUser();

        mutateAsync.mockResolvedValue({});

        await waitFor(async () => render(
            <EditModal itemId="1" />
        ));

        await waitFor(async () => {
            fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'bohdan' } });
            fireEvent.change(screen.getByLabelText('User name'), { target: { value: 'dihtiar' } });
            fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'bogdan.digtyar@gmail.com' } });
            fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Dnipro' } });
        }
        )

        await waitFor(async () => {
            fireEvent.click(screen.getByText('Save'));
        })

        expect(mutateAsync).toHaveBeenCalledWith({
            userId: '1',
            updatedUser: {
                name: 'bohdan',
                userName: 'dihtiar',
                email: 'bogdan.digtyar@gmail.com',
                city: 'Dnipro'
            }
        });
    });

    it('Checks form validation errors', async () => {
        render(<EditModal />);

        await waitFor(async () => {
            fireEvent.click(screen.getByText('Save'));
        })

        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('City is required')).toBeInTheDocument();
        expect(screen.getByText('Username is required')).toBeInTheDocument();
    });
});