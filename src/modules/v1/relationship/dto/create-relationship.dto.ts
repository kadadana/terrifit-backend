import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateRelationshipDto {

    @IsUUID('4', { message: 'Invalid sender ID format!' })
    @IsNotEmpty({ message: 'Sender ID is required!' })
    senderId: string;

    @IsUUID('4', { message: 'Invalid receiver ID format!' })
    @IsNotEmpty({ message: 'Receiver ID is required!' })
    receiverId: string;

    @IsOptional()
    @IsEnum(['followed', 'blocked'],
        { message: 'Status must be either followed or blocked!' })
    status?: string;
}
