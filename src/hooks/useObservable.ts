import { useState, useEffect } from 'react';
import { Observable, BehaviorSubject } from 'rxjs';

export function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(() => {
    if (observable$ instanceof BehaviorSubject) {
      return (observable$ as BehaviorSubject<T>).value;
    }
    return initialValue;
  });

  useEffect(() => {
    const subscription = observable$.subscribe((val) => {
      setValue(val);
    });
    return () => subscription.unsubscribe();
  }, [observable$]);

  return value;
}
