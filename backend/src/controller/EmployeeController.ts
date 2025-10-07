import type { Request, Response } from "express";
import { EmployeeService } from "../service/EmployeeService.js";
import { employeeSchema } from "../validation/validation.js";

const employeeService = new EmployeeService();

export class EmployeeController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as any;
      const body = { ...req.body };

      if (user.role === 'ADMIN' || user.role === 'CAISSIER') {
        if (!body.entrepriseId) {
          body.entrepriseId = user.entrepriseId;
        }
      }
      // For SUPER_ADMIN, entrepriseId should be provided in body

      if (!body.role) {
        body.role = 'EMPLOYE';
      }
      if (body.actif === undefined) {
        body.actif = true;
      }

      const validatedData = employeeSchema.parse(body);
      const employee = await employeeService.create(validatedData);
      res.status(201).json(employee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const filters: any = {};
      const user = req.user as any;
      
      console.log('EmployeeController findAll - user role:', user.role);
      console.log('EmployeeController findAll - req.query:', req.query);

      if (req.query.entrepriseId) {
        filters.entrepriseId = parseInt(req.query.entrepriseId as string);
        console.log('EmployeeController findAll - SUPER_ADMIN with entrepriseId:', filters.entrepriseId);
      } else if (user.role === 'ADMIN' || user.role === 'CAISSIER') {
        filters.entrepriseId = user.entrepriseId;
      }

      console.log('EmployeeController findAll - final filters:', filters);
      
      const employees = await employeeService.findAll(filters);
      res.json(employees);
    } catch (error: any) {
      console.error('Error in findAll:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const employee = await employeeService.findById(id);
      if (!employee) {
        res.status(404).json({ error: "Employee not found" });
        return;
      }

      const user = req.user as any;
      if ((user.role === 'ADMIN' || user.role === 'CAISSIER') && employee.entrepriseId !== user.entrepriseId) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      res.json(employee);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const employee = await employeeService.update(id, req.body);
      res.json(employee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await employeeService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async toggleActive(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const employee = await employeeService.toggleActive(id);
      res.json(employee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
