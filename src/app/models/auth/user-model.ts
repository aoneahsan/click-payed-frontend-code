export class User {
    constructor(
        public id,
        public user_name,
        public user_email,
        private user_tokken,
        private tokken_expire_time  ) {}

        // get user tokken
        get tokken() {
            if (!this.tokken_expire_time || new Date() > this.tokken_expire_time) {
                return null;
            }
            return this.user_tokken;
        }
}