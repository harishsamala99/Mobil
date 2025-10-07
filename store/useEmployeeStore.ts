import { create } from 'zustand';
import { EMPLOYEES_DATA as initialEmployees } from '../constants';
import type { Employee } from '../types';

type EmployeeStoreState = {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id' | 'avatar'>) => void;
  updateEmployee: (id: string, updatedEmployee: Partial<Omit<Employee, 'id'>>) => void;
  removeEmployee: (id: string) => void;
};

export const useEmployeeStore = create<EmployeeStoreState>((set) => ({
  employees: initialEmployees,
  addEmployee: (employee) =>
    set((state) => ({
      employees: [
        ...state.employees,
        { 
          ...employee, 
          id: (state.employees.length + 1).toString() + Date.now(),
          avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
        },
      ],
    })),
  updateEmployee: (id, updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      ),
    })),
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    })),
}));
