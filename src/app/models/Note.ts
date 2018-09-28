export interface Note{
    NoteId?: number;
    OwnerId?: number;
    Title: string;
    Content: string;
    IsStarred?: boolean;
    CreatedUtc?: Date;
    ModifiedUtc?: Date;
}