import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root', })
export class DisplayedTextService {

    private text = signal('');
    public displayedText = signal('');
    protected speed = signal(5);
    protected index = signal(0);


public restartStreaming(text: string) {
    this.setText(text);
    this.displayedText.set('');
    this.index.set(0);
    this.startStreaming();
}
    /**
     * Para iniciar el efecto streaming del titulo inicial.
     */

    private startStreaming(): void {
        let lastTime = 0;

        const step = (timestamp: number) => {
            if (!lastTime) {
                lastTime = timestamp;
            }
            const currentText = this.text();

            const delta = timestamp - lastTime;

            if (delta >= this.speed()) {

                this.displayedText.update(current =>
                    current + currentText.charAt(this.index())
                );

                this.index.update(i => i + 1);

                lastTime = timestamp;
            }

            if (this.index() < currentText.length) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }


    public setText(text: string) {
        this.text.set(text);
    }
}