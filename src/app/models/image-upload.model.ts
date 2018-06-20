import { Observable } from "rxjs";

export class ImageUpload {
    $key: string;
    name: string;
    url: string;
    progress: Observable<number>;
    createdDate: Date;

    constructor(public file: File) {

    }
}