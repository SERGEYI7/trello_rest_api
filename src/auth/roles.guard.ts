import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { request } from 'http';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) 
    {
        // @InjectRepository(User) private readonly userRepository: Repository<User>
    }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log("request")
    const {columnId, cardId, commentaryId} = request["params"]

    const user = request["user"];
    switch (roles[0]) {
        case "column": 
            return (this.roleColumn(roles[0], user, request["params"]))
        case "card": 
            return (this.roleCard(roles[0], user, request['params']))
        case "commentary": 

            return (this.roleCommentary(roles[0], user, request["params"]))
        default:
            return true
    }
  }

  async roleColumn(roles: string, user: any, params: object): Promise<boolean> {
    const col = await this.userRepository.findOne({where: {id: user.sub, columns: {id: params["id"]}}, relations: {columns: true}})
    console.log(`user.sub ${user.sub}`)
    console.log(`userId ${params["userId"]}`)
    console.log(col)
    if (col && params["userId"] == user.sub) {
        return true
    }
    return false
  }

  async roleCard(roles: string, user: any, params: object): Promise<boolean> {
    const col = await this.userRepository.findOne({where: {id: user.sub, columns: {id: params["columnId"], cards: {id: params["id"]}}}, relations: ["columns", "columns.cards"]})
    console.log(params)
    if (col && params["userId"] == user.sub) {
        return true
    }
    return false
  }

  async roleCommentary(roles: string, user: any, params: object): Promise<boolean> {
    const com = await this.userRepository.findOne({where: {id: user.sub, columns: {id: params["columnId"], cards: {id: params["cardId"], commentaries: {id: params["id"]}}}}, relations: ["columns", "columns.cards", "columns.cards.commentaries"]})
    // const com = await this.userRepository.findOne({id: user.sub, columns: {id: params["columnId"], cards: {id: params["cardId"], commentaries: {id: params["id"]}}}})
    console.log(`user.sub ${user.sub}`)
    console.log(`userId ${params["userId"]}`)
    if (com && params["userId"] == user.sub) {
        return true
    }
    return false
  }
}