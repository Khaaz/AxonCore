
/**
 * A different Logger that uses Signale to format console output. See DefLogger for documentation.
 * https://github.com/klauscfhq/signale
 *
 * @author KhaaZ, Eleos
 *
 * @class SignaleLogger
 * @extends ALogger
 */
export class SignaleLogger extends ALogger {
    /** Signale */
    public out: Signale;
}
