import { Component, computed, input, signal } from '@angular/core';
import { Slide } from '../../core/interfaces/slides';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-slider',
  imports: [NgStyle],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider {

  slides = input.required<Slide[]>();
  currentIndex = signal(0);

  private startX = signal(0);
  private deltaX = signal(0);
  private isDragging = signal(false);
  private containerWidth = signal(1);

  slidesContainerStyles = computed(() => {
    const baseOffsetPercent = this.currentIndex() * (100 / this.slides().length);
    const dragPx = this.isDragging() ? this.deltaX() : 0;

    return {
      width: `${this.slides().length * 100}%`,
      transform: `translateX(calc(-${baseOffsetPercent}% + ${dragPx}px))`,
      transition: this.isDragging() ? 'none' : 'transform 0.4s ease'
    };
  });

  getStyle = (slide: Slide) => ({
    backgroundImage: `url(${slide.url})`,
    width: `${100 / this.slides().length}%`
  });

  goToPrevious() {
    const isFirst = this.currentIndex() === 0;
    this.currentIndex.set(isFirst ? this.slides().length - 1 : this.currentIndex() - 1);
  }

  goToNext() {
    const isLast = this.currentIndex() === this.slides().length - 1;
    this.currentIndex.set(isLast ? 0 : this.currentIndex() + 1);
  }

  goSlide(index: number) {
    this.currentIndex.set(index);
  }

  // --- Pointer events: funciona igual para mouse, touch y stylus ---

  onPointerDown(event: PointerEvent, containerEl: HTMLElement) {
    this.isDragging.set(true);
    this.containerWidth.set(containerEl.offsetWidth);
    this.startX.set(event.clientX);
    this.deltaX.set(0);
    // Captura el puntero: sigue recibiendo eventos aunque el dedo/mouse
    // salga del elemento durante el arrastre
    containerEl.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isDragging()) return;
    this.deltaX.set(event.clientX - this.startX());
  }

  onPointerUp() {
    if (!this.isDragging()) return;

    const threshold = this.containerWidth() * 0.2;

    if (this.deltaX() > threshold) {
      this.goToPrevious();
    } else if (this.deltaX() < -threshold) {
      this.goToNext();
    }

    this.isDragging.set(false);
    this.deltaX.set(0);
  }
}