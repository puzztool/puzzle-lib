import EncodingEntry from '../Common/EncodingEntry';
import SemaphoreData from './SemaphoreData';
import SemaphoreDirection from './SemaphoreDirection';
import SemaphoreEncoding from './SemaphoreEncoding';

class SemaphorePrediction {
    public static PossibleSemaphore(knownFlags: SemaphoreDirection) {
        // TODO Code Review: Can we genericize this into EncodingBase with template parameters?
        // Not sure if that restricts other encodings too much.  If we flip the bit order of morse,
        // I think it works for all of our current ones.
        return SemaphoreData.instance.entries.filter(
            (sem: EncodingEntry<SemaphoreEncoding>) => (
                (knownFlags === SemaphoreDirection.None) ||
                ((sem.encoding & knownFlags) === knownFlags)
            ));
    }
}

export default SemaphorePrediction;
