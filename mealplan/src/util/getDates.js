
class DateFormatted extends Date {
    #weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    #months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor() {
        super();
        this.month = this.getMonth();
        this.year = this.getFullYear();
    }

    getDayName(index) {
        return (this.#weekdays[index])
    }

    getFormattedDate(index) {
        const currentDayOfWeek = this.getDay();
        const targetDate = new Date(this);
        targetDate.setDate(this.getDate() - currentDayOfWeek + index + 1);

        return targetDate.getDate();
    }

    getMonthName(index) {
        const currentDayOfWeek = this.getDay();
        const targetDate = new Date(this);
        
        targetDate.setDate(this.getDate() - currentDayOfWeek + index + 1);
        
        return this.#months[targetDate.getMonth()];
    }

    getWeekSpan(id) {
        if (id) {
            const idxs = id.split("-");
            const weekNumber = parseInt(idxs[0], 10);
            const year = parseInt(idxs[1], 10);
            
            if (!isNaN(weekNumber) && !isNaN(year)) {
                const d = (1 + (weekNumber - 1) * 7);
                const startDate = new Date(year, 0, d);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 7);

                if (startDate.getMonth() !== endDate.getMonth()) {
                    return `${startDate.getDate()} ${this.#months[startDate.getMonth()].slice(0, 3)} - ${endDate.getDate()} ${this.#months[endDate.getMonth()].slice(0, 3)} ${year}`;
                } else {
                    return `${startDate.getDate()} - ${endDate.getDate()} ${this.#months[startDate.getMonth()].slice(0, 3)}, ${year}`;
                }
            } else {
                return "Invalid input format";
            }
        } else {
            const currentDayOfWeek = this.getDay();
            const start = new Date(this);
            start.setDate(this.getDate() - currentDayOfWeek + 1);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
    
            if (start.getMonth() !== end.getMonth()) {
                return `${start.getDate()} ${this.#months[start.getMonth()].slice(0, 3)} - ${end.getDate()} ${this.#months[end.getMonth()].slice(0, 3)}`;
            } else {
                return `${start.getDate()} - ${end.getDate()} ${this.#months[start.getMonth()]}`;
            }
        }
    }

    getDateModifier(index) {
        var date = this.getFormattedDate(index);
        var dateModifier = date === 1 || date === 21 ? "st" : 
        (date === 2 || date === 22 ? "nd" : 
        (date === 3 || date === 23 ? "rd" : "th"));
        return dateModifier;
    }

    getMealPlanID() {
        var startDate = new Date(this.getFullYear(), 0, 1);
        var days = Math.floor((this - startDate) /
            (24 * 60 * 60 * 1000));
        
        var weekNumber = Math.ceil(days / 7);
        return weekNumber + "-" + this.getFullYear();
    }
}

export default DateFormatted;