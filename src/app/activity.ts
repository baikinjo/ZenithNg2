export class Activity {
	activityId: number;
	activityDesc: string;
	creationDate: Date;

	constructor(obj?: any ){
	 this.activityId = obj && obj.activityId || null;
	 this.activityDesc = obj && obj.activityDesc || null;
	 this.creationDate = obj && obj.creationDate || null;
	}
}
