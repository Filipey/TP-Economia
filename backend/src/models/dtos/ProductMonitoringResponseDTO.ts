/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class ProductMonitoringResponseDTO {
  @IsNotEmpty()
  id: number;

  name: string;

  brand: string;

  value: number;

  inventory: number;

  initialDate: Date;

  finishDate: Date;

  sellingsGoal: number;

  actualSellings: number;
}
